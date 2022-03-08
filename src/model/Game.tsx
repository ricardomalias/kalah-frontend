import { GameStatus } from "./GameStatus";
import Ping from "./Ping";

export default interface Game {
    idGame: string,
    firstPlayerKey: string,
    secondPlayerKey: string,
    firstPlayerName: string,
    secondPlayerName: string,
    firstPlayerPing: Ping,
    secondPlayerPing: Ping,
    playerTurnNumber: number,
    matchTurn: number,
    matchTime: number,
    status: GameStatus,
    cups: Array<number>
  }