import axios from "axios";
import { baseUrl } from '../appconstants/Utils';

export function AddCustomer(customer) {
    return axios.post(baseUrl + "customer/add/" + customer)
}

export function AddSavings(customer) {
    return axios.post(baseUrl + "account/savingsaccount/add/" + customer)
}

export function AddTerm(customer) {
    return axios.post(baseUrl + "account/termaccount/add/" + customer)
}

export function FindCust(id) {
    return axios.get(baseUrl + "customer/find/" + id)
}

export function UpdCustomer(customer) {
    return axios.put(baseUrl + "customer/update/" + customer)
}

export function DelCustomer(id) {
    return axios.delete(baseUrl + "customer/delete/" + id)
}