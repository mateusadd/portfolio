import './Sidebar.css'
import { Link } from 'react-router-dom';
import {IoIosHome, IoIosCalendar} from "react-icons/io"
import {GiHairStrands} from "react-icons/gi"
import {BiSolidUser} from "react-icons/bi"
import {BiSolidReport} from "react-icons/bi"
import {FaUsers} from "react-icons/fa"

const Sidebar = () => {
    return (
        <div className='sidebar'>
        <ul>
            <>
                <li>
                    <Link className="navigate" to="/">
                        <IoIosHome size="30" /> 
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="navigate" to="/agendamento">
                        <IoIosCalendar size="30" /> 
                        Agendamento
                    </Link>
                </li>
                <li>
                    <Link className="navigate" to="/clientes">
                        <BiSolidUser size="30" /> 
                        Clientes
                    </Link>
                </li>
                <li>
                    <Link className="navigate" to="/agendamento">
                        <GiHairStrands size="30" /> 
                        Serviços
                    </Link>
                </li>
                <li>
                    <Link className="navigate" to="/agendamento">
                        <FaUsers size="30" /> 
                        Funcionários
                    </Link>
                </li>
                <li>
                    <Link className="navigate" to="/relatorios/comissoes">
                        <BiSolidReport size="30" /> 
                        Relatórios
                    </Link>
                </li>
            </>
        </ul>
    </div>
    );

};

export default Sidebar;