import { useEffect, useState, useRef } from "react";
import { useDashboard } from "../../context/dashboard/DashboardProvider";
import { Bar } from "react-chartjs-2";
function DashboardPage() {
    const clienteRef = useRef(null);
    const obraRef = useRef(null);
    const clientesObras = useRef(null)
    const especialidadesObras = useRef(null)

    const { getDashboardClientes, getDashboardObras, getDashboardClienteObras, getDashboardEspecialidades } = useDashboard()
    const [clientesData, setClientesData] = useState([])
    const [obrasData, setObrasData] = useState([])

    useEffect(() => {
        const dataClientes = async () =>{
            const currentDate = new Date()

            const thirtyDaysAgo = new Date()
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
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
                }else{
                    clientesCountDia[createdAtFormmated] = 1
                }
            });
            const data = Object.entries(clientesCountDia).map(([date, count]) => ({date, count}))
            setClientesData(data)
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
                }else{
                    obraCountDia[createdAtFormmated] = 1
                }
            });
            const data = Object.entries(obraCountDia).map(([date, count]) => ({date, count}))
            setObrasData(data)
        }
        dataClientes()
        dataObras()
    //   const loadClientesChart = async () =>{
    //     if (chartRef && chartRef.current) {
    //         const dataClientes = await getDashboardClientes()
    //         const data = {
    //           labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //           datasets: [{
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2, 3],
    //             borderWidth: 1,
    //           }],
    //         };
      
    //         const options = {
    //           scales: {
    //             x: {
    //               beginAtZero: true,
    //             },
    //             y: {
    //               beginAtZero: true,
    //             },
    //           },
    //         };
      
    //         new Chart(chartRef.current, {
    //           type: 'bar',
    //           data: data,
    //           options: options,
    //         });
    //       }        
    //   }
    //   loadClientesChart()
    }, []);
    useEffect(() => {
        const loadchartClientes = () =>{
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
        const loadchartObras = () =>{
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
        const loarchartClientesObras = async () =>{
            if (clientesObras && clientesObras.current) {
                const ctx = clientesObras.current.getContext("2d");
                const clientesObrasData = await getDashboardClienteObras();

                const obrasPorCliente = {};
                clientesObrasData.forEach((entry) => {
                  const idCliente = entry.cliente.idCli;
                  obrasPorCliente[idCliente] = (obrasPorCliente[idCliente] || 0) + 1;
                });
            

                const clientes = clientesObrasData.map((entry) => entry.cliente.nombre);
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
        }
        const loadchartEspecialidades = async () =>{
            if (especialidadesObras && especialidadesObras.current) {
                const ctx = especialidadesObras.current.getContext("2d");
                const especialidadesData = await getDashboardEspecialidades();

                const especialidadesCount = {};

                especialidadesData.forEach((obra) => {
                  obra.empleado_obra.forEach((empleado) => {
                    empleado.empleado.empleado_especialidad.forEach((especialidad) => {
                      const nombreEspecialidad = especialidad.especialidad.especialidad;
                      especialidadesCount[nombreEspecialidad] = (especialidadesCount[nombreEspecialidad] || 0) + 1;
                    });
                  });
                });
          
                const especialidadesLabels = Object.keys(especialidadesCount);
                const especialidadesValues = Object.values(especialidadesCount);

                new Chart(ctx, {
                    type: "bar",
                    data: {
                      labels: especialidadesLabels,
                      datasets: [
                        {
                          label: "Cantidad de especialidades en Obras",
                          data: especialidadesValues,
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
                            text: "Cantidad de Obras",
                          },
                        },
                      },
                    },
                  });                

            }
        }
        loadchartEspecialidades()
        loarchartClientesObras()
        loadchartObras()
        loadchartClientes()     
    }, [clientesData, obrasData])
    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>


            <div className="row">


                <div className="col-xl-6 col-md-6">
                    <div className="card shadow mb-4">

                        <div
                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Clientes registrados en los ultimos 30 Días</h6>
                        </div>

                        <div className="card-body">
                            <div className="chart-area">
                            <canvas ref={clienteRef}></canvas>
                            </div>
                        </div>
                    </div>
                </div>

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
                            <h6 className="m-0 font-weight-bold text-primary">Clientes que han solicitado servicios en los últimos 30 Días</h6>
                        </div>

                        <div className="card-body">
                            <div className="chart-area">
                            <canvas ref={clientesObras}></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-6">
                    <div className="card shadow mb-4">

                        <div
                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Especialidades mas utilizadas en los últimos 30 Días</h6>
                        </div>

                        <div className="card-body">
                            <div className="chart-area">
                            <canvas ref={especialidadesObras}></canvas>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </>
    )
}
export default DashboardPage