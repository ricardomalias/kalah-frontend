import { GameStatus } from "./GameStatus";
import Ping from "./Ping";

export default interface Game {
    playerName: string,
    playerKey: string,
    playerNumber: number,
    playerPing: Ping,
    playerTurn: boolean,
    opponentMancala: number,
    playerMancala: number,
    matchTime: number,
    matchTurn: number,
    status: GameStatus,
    cups: Array<number>
  }