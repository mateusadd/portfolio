import React from 'react';
import ReactDOM from 'react-dom';
import Payment from "../components/Payment/Payment";

export function renderPayment() {
    ReactDOM.render(<Payment/>, document.getElementById('payment'));
}