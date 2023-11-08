import React, { useState } from 'react';
import './Sidebar.css'
import { Link } from 'react-router-dom';
import {IoIosHome, IoIosCalendar} from "react-icons/io"
import {GiHairStrands} from "react-icons/gi"
import {BiSolidUser} from "react-icons/bi"
import {BiSolidReport} from "react-icons/bi"
import {FaUsers} from "react-icons/fa"
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'

const Sidebar = () => {
    const [reportsExpanded, setReportsExpanded] = useState(false);

    const toggleReports = () => {
        setReportsExpanded(!reportsExpanded);
    };

    return (
        <div className='sidebar'>
            <ul>
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
                    <div className="report-toggle" onClick={toggleReports}>
                        <Link className="navigate">
                            <BiSolidReport size="30" />
                            Relatórios
                        </Link>
                        {reportsExpanded ? <FiChevronDown/> : <FiChevronRight />}
                    </div>
                    {reportsExpanded && (
                        <ul className="sub-menu">
                            <li>
                                <Link className="navigate" to="/relatorios/comissoes">
                                    Comissões
                                </Link>
                            </li>
                            <li>
                                <Link className="navigate">
                                    Pagamentos
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
