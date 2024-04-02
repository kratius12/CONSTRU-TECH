import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDashboard } from "../../context/dashboard/DashboardProvider";
import { Bar } from "react-chartjs-2";
function DashboardPage() {

    const clienteRef = useRef(null);
    const obraRef = useRef(null);
    const clientesObras = useRef(null)
    const obrasEstados = useRef(null)

    const { getDashboardClientes, getDashboardObras, getDashboardClienteObras, getObrasEstados, getDashboardEmpleadosCount, getTotalCompras, getDashboardClientesCount} = useDashboard()
    const [clientesData, setClientesData] = useState([])
    const [obrasData, setObrasData] = useState([])

    const [countObras, setCountObras] = useState([])
    const [countClientes, setCountClientes] = useState([])
    const [countEmpleados, setCountEmpleados] = useState([])
    const [totalCompras, setTotalCompras] = useState([])

    useEffect(() => {
        const dataClientes = async () => {
            const currentDate = new Date()

            const today = new Date();
            const thirtyDaysAgo = new Date(today);
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const todayFormatted = currentDate.toISOString().split('T')[0]
            const thirtyDaysAgoFormatted = thirtyDaysAgo.toISOString().split('T')[0]

            const clientesInfo = await getDashboardClientes()
            const clientesRegistrados = clientesInfo.filter(cliente => {
                const createdAtFormmated = cliente.createdAt.split('T')[0]
                return createdAtFormmated >= thirtyDaysAgoFormatted && createdAtFormmated <= todayFormatted
            })
            const clientesCountDia = {}

            clientesRegistrados.forEach(cliente => {
                const createdAtFormmated = cliente.createdAt.split('T')[0]
                if (clientesCountDia[createdAtFormmated]) {
                    clientesCountDia[createdAtFormmated]++
                } else {
                    clientesCountDia[createdAtFormmated] = 1
                }
            });
            const data = Object.entries(clientesCountDia).map(([date, count]) => ({ date, count }))
            
            // setClientesData(data)
        }
        const dataObras = async () => {
            const currentDate = new Date()

            const thirtyDaysAgo = new Date()
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
            const todayFormatted = currentDate.toISOString().split('T')[0]
            const thirtyDaysAgoFormatted = thirtyDaysAgo.toISOString().split('T')[0]

            const obrasInfo = await getDashboardObras()

            const obrasRegistradas = obrasInfo.filter(obra => {
                const createdAtFormmated = obra.createdAt.split('T')[0]
                return createdAtFormmated >= thirtyDaysAgoFormatted && createdAtFormmated <= todayFormatted
            })
            const obraCountDia = {}

            obrasRegistradas.forEach(obra => {
                const createdAtFormmated = obra.createdAt.split('T')[0]
                if (obraCountDia[createdAtFormmated]) {
                    obraCountDia[createdAtFormmated]++
                } else {
                    obraCountDia[createdAtFormmated] = 1
                }
            });
            const data = Object.entries(obraCountDia).map(([date, count]) => ({ date, count }))
            setObrasData(data)
        }
        dataClientes()
        dataObras()

    }, []);
    // console.clear()
    useEffect(() => {
        const loadchartClientes = () => {
            if (clienteRef && clienteRef.current) {
                const ctx = clienteRef.current.getContext('2d');

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: clientesData.map(entry => entry.date),
                        datasets: [{
                            label: 'Clientes Registrados',
                            data: clientesData.map(entry => entry.count),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'day'
                                },
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Cantidad de clientes'
                                }
                            }
                        }
                    }
                });
            }
        }
        const loadchartObras = () => {
            if (obraRef && obraRef.current) {
                const ctx = obraRef.current.getContext('2d');

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: obrasData.map(entry => entry.date),
                        datasets: [{
                            label: 'Obras ingresadas',
                            data: obrasData.map(entry => entry.count),
                            backgroundColor: 'rgba(39, 80, 245, 0.8)',
                            borderColor: 'rgba(39, 80, 245, 0.8)',
                            borderWidth: 1,
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'day'
                                },
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Cantidad de obras'
                                }
                            }
                        }
                    }
                });
            }
        }
        const loadchartClientesObras = async () => {
            if (clientesObras && clientesObras.current) {
                const ctx = clientesObras.current.getContext("2d");
                const clientesObrasData = await getDashboardClienteObras();
            
                // Filtrar obras dentro de los últimos 30 días
                const fechaLimite = new Date();
                fechaLimite.setDate(fechaLimite.getDate() - 30);
                const obrasRecientes = clientesObrasData.filter(
                  (entry) => new Date(entry.createdAt) >= fechaLimite
                );
            
                // Crear un objeto que mapea el ID del cliente a su nombre
                const nombresClientes = {};
                clientesObrasData.forEach((entry) => {
                  nombresClientes[entry.cliente.idCli] = entry.cliente.nombre;
                });
            
                // Contar la cantidad de obras por cliente
                const obrasPorCliente = {};
                obrasRecientes.forEach((entry) => {
                  const idCliente = entry.cliente.idCli;
                  obrasPorCliente[idCliente] = (obrasPorCliente[idCliente] || 0) + 1;
                });
            
                // Obtener nombres de clientes y cantidades de obras
                const clientes = Object.keys(obrasPorCliente).map(
                  (idCliente) => nombresClientes[idCliente]
                );
                const obras = Object.values(obrasPorCliente);

                new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: clientes,
                        datasets: [
                            {
                                label: "Cantidad de Servicios Solicitados",
                                data: obras,
                                backgroundColor: "rgba(245, 39, 39, 0.2)",
                                borderColor: "rgba(245, 39, 39, 0.2)",
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: "Cantidad de Servicios",
                                },
                            },
                        },
                    },
                });
            }
        };

        const loadchartObrasEstados = async () => {
            if (obrasEstados && obrasEstados.current) {
                const ctx = obrasEstados.current.getContext("2d");
                const obrasEstadosData = await getObrasEstados();

                const obrasEstadosCount = {}
                obrasEstadosData.result.forEach((obra) => {
                    obrasEstadosCount[obra.estado] = obra._count._all
                })

                const obrasEstadosLabels = Object.keys(obrasEstadosCount)
                const obrasEstadosValues = Object.values(obrasEstadosCount)

                new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: obrasEstadosLabels,
                        datasets: [
                            {
                                label: "Cantidad obra estado",
                                data: obrasEstadosValues,
                                backgroundColor: "rgba(253, 113, 0, 0.8)",
                                borderColor: "rgba(253, 113, 0, 0.8)",
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: "Cantidad de Obras estado",
                                },
                            },
                        },
                    },
                });

            }
        }
        const loadCounts = async () =>{
            const obrasInfo = await getDashboardObras()
            setCountObras(obrasInfo.length)
            const clientesCount = await getDashboardClientesCount()
            setCountClientes(clientesCount.length)
            const empleadosCount = await getDashboardEmpleadosCount()
            const totalCompras = await getTotalCompras()
            setTotalCompras(totalCompras.total_compra.toLocaleString())
            setCountEmpleados(empleadosCount)
        }

        loadchartObrasEstados()
        loadchartClientesObras()
        loadchartObras()
        loadchartClientes()
        loadCounts()
    }, [clientesData, obrasData])

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>
                    <div className="row">


                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center text-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Clientes</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{countClientes}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-address-card fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center text-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Total Obras</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{countObras}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-map-location-dot fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-warning shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center text-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Total empleados</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{countEmpleados}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-user-group fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-danger shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center text-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                                Total comprado</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">$ {totalCompras}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-cart-shopping fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>

            <div className="row">

                <div className="col-xl-6 col-md-6">
                    <div className="card shadow mb-4">

                        <div
                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Obras ingresadas en los ultimos 30 Días</h6>
                        </div>

                        <div className="card-body">
                            <div className="chart-area">
                                <canvas ref={obraRef}></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-md-6">
                    <div className="card shadow mb-4">

                        <div
                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Reporte de cantidad de obras por estado</h6>
                        </div>

                        <div className="card-body">
                            <div className="chart-area">
                                <canvas ref={obrasEstados}></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-md-6">
                    <div className="card shadow mb-4">

                        <div
                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Clientes que han solicitado servicios en los últimos 30 Días</h6>
                        </div>

                        <div className="card-body">
                            <div className="chart-area">
                                <canvas ref={clientesObras}></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DashboardPage