import { describe, expect, it, vi } from "vitest";
import {
  createDispatcher,
  EnvelopeSchema,
  EventMessageSchema,
  InputMessageSchema,
  LobbyMessageSchema,
  SnapshotMessageSchema,
} from "../src/index";

const validInput = {
  seq: 42,
  timestampMs: 1000,
  keys: {
    forward: true,
    backward: false,
    left: false,
    right: false,
    jump: false,
    sprint: true,
    crouch: false,
    firing: true,
    ads: false,
    reload: false,
    weaponSwitch: null,
    melee: false,
    ability: false,
  },
  look: { yaw: 0.01, pitch: -0.02 },
};

const validSnapshot = {
  tick: 120,
  timeRemainingSec: 180,
  mode: "ffa",
  status: "live",
  scoreboard: { red: 0, blue: 0 },
  players: [
    {
      id: "p1",
      isBot: false,
      classId: "sentinel",
      team: null,
      position: { x: 1, y: 2, z: 3 },
      velocity: { x: 0, y: 0, z: 0 },
      yaw: 0,
      pitch: 0,
      health: 100,
      ammoMag: 30,
      ammoReserve: 90,
      alive: true,
      lastProcessedInputSeq: 42,
      score: 0,
      kills: 0,
      deaths: 0,
      assists: 0,
      headshots: 0,
    },
  ],
  hardpointZones: [],
  flags: null,
};

describe("InputMessageSchema", () => {
  it("accepts a valid input message", () => {
    expect(InputMessageSchema.parse(validInput).seq).toBe(42);
  });

  it("rejects a message with a negative sequence number", () => {
    expect(() => InputMessageSchema.parse({ ...validInput, seq: -1 })).toThrow();
  });

  it("rejects an out-of-range weapon slot", () => {
    expect(() =>
      InputMessageSchema.parse({
        ...validInput,
        keys: { ...validInput.keys, weaponSwitch: 5 },
      }),
    ).toThrow();
  });
});

describe("SnapshotMessageSchema", () => {
  it("accepts a valid snapshot", () => {
    expect(SnapshotMessageSchema.parse(validSnapshot).tick).toBe(120);
  });

  it("rejects an unknown game mode", () => {
    expect(() =>
      SnapshotMessageSchema.parse({ ...validSnapshot, mode: "battle-royale" }),
    ).toThrow();
  });

  it("rejects a player with negative health", () => {
    expect(() =>
      SnapshotMessageSchema.parse({
        ...validSnapshot,
        players: [{ ...validSnapshot.players[0]!, health: -5 }],
      }),
    ).toThrow();
  });
});

describe("EventMessageSchema", () => {
  it("accepts a kill event", () => {
    const msg = EventMessageSchema.parse({
      kind: "kill",
      payload: {
        killerId: "p1",
        victimId: "p2",
        weaponId: "assault-rifle",
        isHeadshot: false,
        isFirstBlood: true,
        medal: null,
      },
    });
    expect(msg.kind).toBe("kill");
  });

  it("defaults the killstreak medal to null when omitted", () => {
    const msg = EventMessageSchema.parse({
      kind: "kill",
      payload: {
        killerId: "p1",
        victimId: "p2",
        weaponId: "assault-rifle",
        isHeadshot: false,
        isFirstBlood: false,
        // medal omitted -> defaults to null
      },
    });
    if (msg.kind === "kill") {
      expect(msg.payload.medal).toBeNull();
    } else {
      throw new Error("expected kill");
    }
  });

  it("accepts a death event", () => {
    const msg = EventMessageSchema.parse({
      kind: "death",
      payload: {
        victimId: "p2",
        killerId: "p1",
        weaponId: "sniper-rifle",
        position: { x: 1, y: 2, z: 3 },
        isHeadshot: true,
      },
    });
    expect(msg.kind).toBe("death");
  });

  it("rejects a death event without a victim position", () => {
    expect(() =>
      EventMessageSchema.parse({
        kind: "death",
        payload: { victimId: "p2", killerId: "p1", weaponId: "sniper-rifle", isHeadshot: true },
      }),
    ).toThrow();
  });

  it("rejects a medal event with an unknown medal", () => {
    expect(() =>
      EventMessageSchema.parse({
        kind: "medal",
        payload: { playerId: "p1", medal: "pentakill" },
      }),
    ).toThrow();
  });

  it("rejects a mismatched kind/payload combination", () => {
    expect(() =>
      EventMessageSchema.parse({
        kind: "assist",
        payload: { killerId: "p1", victimId: "p2", weaponId: "x" },
      }),
    ).toThrow();
  });
});

describe("LobbyMessageSchema", () => {
  it("accepts a map vote for an allowed map", () => {
    const msg = LobbyMessageSchema.parse({
      kind: "map-vote",
      payload: { roomId: "r1", mapId: "rustpoint" },
    });
    // narrow the discriminated union by kind before reading payload fields
    if (msg.kind === "map-vote") {
      expect(msg.payload.mapId).toBe("rustpoint");
    } else {
      throw new Error("expected map-vote");
    }
  });

  it("rejects a map vote for an unknown map", () => {
    expect(() =>
      LobbyMessageSchema.parse({
        kind: "map-vote",
        payload: { roomId: "r1", mapId: "moon-base" },
      }),
    ).toThrow();
  });
});

describe("EnvelopeSchema", () => {
  it("rejects a message without a payload", () => {
    expect(() => EnvelopeSchema.parse({ type: "input" })).toThrow();
  });
});

describe("createDispatcher", () => {
  it("routes each message type to its handler", () => {
    const handlers = {
      input: vi.fn(),
      snapshot: vi.fn(),
      event: vi.fn(),
      lobby: vi.fn(),
    };
    const dispatch = createDispatcher(handlers);

    dispatch({ type: "input", payload: validInput });
    dispatch({ type: "snapshot", payload: validSnapshot });
    dispatch({
      type: "event",
      payload: {
        kind: "damage",
        payload: { targetId: "p2", attackerId: "p1", damage: 24, isHeadshot: false, distance: 10 },
      },
    });
    dispatch({
      type: "lobby",
      payload: { kind: "room-state", payload: { roomId: "r1", name: "A", mode: "ffa", mapId: "rustpoint", isPrivate: false, maxPlayers: 8, players: [], countdownSec: null } },
    });

    expect(handlers.input).toHaveBeenCalledTimes(1);
    expect(handlers.snapshot).toHaveBeenCalledTimes(1);
    expect(handlers.event).toHaveBeenCalledTimes(1);
    expect(handlers.lobby).toHaveBeenCalledTimes(1);
  });

  it("drops a message with an invalid payload without throwing", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const handlers = { input: vi.fn(), snapshot: vi.fn(), event: vi.fn(), lobby: vi.fn() };
    const dispatch = createDispatcher(handlers);

    // seq is negative -> invalid input payload
    expect(() => dispatch({ type: "input", payload: { ...validInput, seq: -1 } })).not.toThrow();
    expect(handlers.input).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("drops a malformed envelope (wrong type) without throwing", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const handlers = { input: vi.fn(), snapshot: vi.fn(), event: vi.fn(), lobby: vi.fn() };
    const dispatch = createDispatcher(handlers);

    expect(() => dispatch({ type: "teleport", payload: {} })).not.toThrow();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("types the payload per message type in the handler", () => {
    const handlers = { input: vi.fn(), snapshot: vi.fn(), event: vi.fn(), lobby: vi.fn() };
    const dispatch = createDispatcher(handlers);
    dispatch({ type: "input", payload: validInput });
    // handler received the parsed typed payload
    expect(handlers.input.mock.calls[0]![0].seq).toBe(42);
  });
});
