import './Footer.css';
import { dateFormatReport } from '../../../../utils/dateFormat';
import { aggregateReports } from '../../../../utils/aggregateReports';
import { formatValues } from '../../../../utils/formatValues';
import { useEffect, useState } from 'react';
import api from '../../../../services/api'
//import moment from 'moment';

function Footer({somaComissoes}) {

        return (
            <>
                <div className='reports-footer'>
                    <table>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <p>Total: R$ {formatValues(somaComissoes)}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        );

}

export default Footer;