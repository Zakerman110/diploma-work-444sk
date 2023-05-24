import Control from "react-leaflet-custom-control";

import './info.css';
// import {Switch} from "./Switch";
import {OblastMigrationInterface} from "../../../types/migration.interface.ts";

// function numberWithCommas(x) {
//     if (x != null) {
//         return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     } else {
//         return '';
//     }
// }

export function MigrationBox({ data }:{data: OblastMigrationInterface[]}) {
    let infoBox;
    if (data.length > 0) {
        // infoBox = <div className="info" style={{width: "325px"}}><h4>{data.name}</h4>
        infoBox = <div className="info h-full flex flex-col w-min" style={{width: "300px", height: "300px"}}><h4>{data[0].Oblast}</h4>
            <br></br>
            {/*<Switch title={"Migration type"} leftLabel={"Immigration"} rightLabel={"Emigration"} />*/}
            {/*<br></br>*/}
            <div className="relative overflow-x-auto flex h-full">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-2 py-3">
                            Oblast
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Gender
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Migration
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((migration, index) => {
                        return(
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row"
                                    className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {migration.Destination}
                                </th>
                                <td className="px-2 py-4">
                                    {migration.Gender}
                                </td>
                                <td className="px-2 py-4">
                                    {migration.Migration.toFixed(0)}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>;
    } else {
        infoBox = <h4><i>select oblast</i></h4>;
    }

    return (
        <Control position='bottomleft'>
            {infoBox}
        </Control>
    )
}