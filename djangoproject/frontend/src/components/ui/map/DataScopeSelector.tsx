import {DataScope} from "../../../types/datascope.interface.ts";
import {ChangeEventHandler} from "react";

export function DataScopeSelector({ options, value, changeHandler }:{options:DataScope[], value: DataScope, changeHandler: ChangeEventHandler<HTMLSelectElement>}) {
    return (
        <select value={value.key} onChange={changeHandler}>
            {options.map((e) => {
                return <option key={e.key} value={e.key}>{e.name}</option>
            })}
        </select>
    );
}