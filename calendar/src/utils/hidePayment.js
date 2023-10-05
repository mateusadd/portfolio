import ReactDOM from 'react-dom';

export function hidePayment() {
    const paymentElement = document.getElementById('payment');
    ReactDOM.unmountComponentAtNode(paymentElement);
}