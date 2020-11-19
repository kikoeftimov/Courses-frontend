import axios from 'axios';

const TRANSACTIONS_API_URL = "http://localhost:8080/api/transactions";

class TransactionsService {
    getTransactions(){
        return axios.get(TRANSACTIONS_API_URL);
    }

    exportTransactions(){
        return axios.get(TRANSACTIONS_API_URL + "/export")
    }
}

export default new TransactionsService()