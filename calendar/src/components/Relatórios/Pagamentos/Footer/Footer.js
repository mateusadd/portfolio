import './Footer.css';
import { formatValues } from '../../../../utils/formatValues';

function Footer({pagamentos}) {

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