export interface MigrationInterface {
    Oblast: string,
    Migration: number,
    Immigration: number
}

export interface ExternalMigrationInterface {
    Origin: string,
    // Destination: string,
    Migration: number
}

export interface OblastMigrationInterface {
    Oblast: string,
    Destination: string,
    Gender: string,
    Migration: number
}