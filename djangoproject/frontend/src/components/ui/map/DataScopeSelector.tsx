import {DataScope} from "../../../types/datascope.interface.ts";
import {ChangeEventHandler} from "react";

export function DataScopeSelector({ options, value, changeHandler }:{options:DataScope[], value: DataScope, changeHandler: ChangeEventHandler<HTMLSelectElement>}) {
    return (
        <select value={value.key} onChange={changeHandler} className="bg-gray-50 w-min border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {options.map((e) => {
                return <option key={e.key} value={e.key}>{e.name}</option>
            })}
        </select>
    );
}