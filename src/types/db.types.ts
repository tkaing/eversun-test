import { StateType, WattHourType, WattType } from "./basis.types";

export type HistoryRowDb = {
	state: StateType;
	currentPower: WattType;
	totalPowerConsumption: WattHourType;
	deviceName: string;
};
