import axios from "./axios.ts";
import {ExternalMigrationInterface, MigrationInterface} from "../types/migration.interface.ts";

export const MigrationService = {

    async getInternalMigration(startDate: Date, endDate: Date) {
        const response = await axios.get<MigrationInterface[]>('/api/miflow/internal_all/', { params: {
                start_date: startDate.toLocaleDateString(),
                end_date: endDate.toLocaleDateString()
            }})
        return response.data
    },

    async getExternalMigration(startDate: Date, endDate: Date) {
        const response = await axios.get<ExternalMigrationInterface[]>('/api/miflow/external_migration/', { params: {
                start_date: startDate.toLocaleDateString(),
                end_date: endDate.toLocaleDateString()
            }})
        return response.data
    },

    async getExternalImmigration(startDate: Date, endDate: Date) {
        const response = await axios.get<ExternalMigrationInterface[]>('/api/miflow/external_immigration/', { params: {
                start_date: startDate.toLocaleDateString(),
                end_date: endDate.toLocaleDateString()
            }})
        return response.data
    },
}