import { GameStatus } from "./GameStatus";
import Ping from "./Ping";

export default interface Game {
    playerName: string,
    playerKey: string,
    playerNumber: number,
    playerPing: Ping,
    playerTurn: boolean,
    playerMancala: number,
    matchTime: number,
    status: GameStatus,
    cups: Array<number>
  }