import './Footer.css';
import { formatValues } from '../../../../utils/formatValues';
import { useEffect } from 'react';

function Footer({pagamentos}) {

    useEffect(() => {
        console.log(pagamentos)
    }, [pagamentos])

        return (
            <div className='reports-footer'>
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <p>Total: R$ {formatValues(pagamentos)}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );

}

export default Footer;