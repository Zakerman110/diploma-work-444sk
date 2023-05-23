export interface MigrationInterface {
    Oblast: string,
    Migration: number,
    Immigration: number
}

export interface ExternalMigrationInterface {
    Origin: string,
    Destination: string,
    Migration: number
}