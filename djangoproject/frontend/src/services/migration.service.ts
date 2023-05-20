import axios from "./axios.ts";
import {MigrationInterface} from "../types/migration.interface.ts";

export const MigrationService = {

    async getInternalMigration(startDate: Date, endDate: Date) {
        const response = await axios.get<MigrationInterface[]>('/api/miflow/internal_all/', { params: {
                start_date: startDate.toLocaleDateString(),
                end_date: endDate.toLocaleDateString()
            }})
        return response.data
    },
}