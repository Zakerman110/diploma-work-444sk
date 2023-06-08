import axios from "./axios.ts";
import {Flow, FlowDetailsCsv, FlowDetailsValue, FlowNew, UpdateFlowStatus} from "../types/flow.interface.ts";

export const UserMigrationService = {

    async getFlows() {
        return axios.get<Flow[]>('/api/usermigration/flow/')
    },

    async getAllFlows() {
        return axios.get<Flow[]>('/api/usermigration/flow_all/')
    },

    async getAllFlowsDetails() {
        return axios.get<FlowDetailsCsv[]>('/api/usermigration/flow_details_all/')
    },

    async updateFlowStatus(updateFlowStatus: UpdateFlowStatus) {
        return axios.put('/api/usermigration/flow_udpate_status/', updateFlowStatus)
    },

    async postFlow(flow: FlowNew) {
        return axios.post('/api/usermigration/flow_create/', flow)
    },

    async getGenders() {
        return axios.get<FlowDetailsValue[]>('/api/usermigration/genders/')
    },

    async getEducations() {
        return axios.get<FlowDetailsValue[]>('/api/usermigration/educations/')
    },

    async getOccupations() {
        return axios.get<FlowDetailsValue[]>('/api/usermigration/occupations/')
    },

    async getStatuses() {
        return axios.get<FlowDetailsValue[]>('/api/usermigration/statuses/')
    },

    async getCountries() {
        return axios.get<FlowDetailsValue[]>('/api/usermigration/countries/')
    }
}