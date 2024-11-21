import { DraughtsGameHistory1D } from 'rapid-draughts/dist/core/game';
import { DraughtsEngineData } from 'rapid-draughts/dist/core/engine';
import { EnglishDraughtsEngineStore } from 'rapid-draughts/dist/english/engine';


export interface BoardObjInterface {
    data: Partial<DraughtsEngineData<number, EnglishDraughtsEngineStore>>;
    history: Partial<DraughtsGameHistory1D>;
}
 
  