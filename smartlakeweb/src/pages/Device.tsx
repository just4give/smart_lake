import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonContent, IonPage, IonRow, useIonViewDidEnter, useIonViewDidLeave } from "@ionic/react"
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import GaugeChart from 'react-gauge-chart'
import { getSmartLakeDevice, listSmartLakeDeviceLogs } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

const Device: React.FC = () => {
    Chart.register(CategoryScale);
    const location = useLocation();
    const params: any = useParams();
    const deviceId: string = params.id;
    
    const [ph, setPh] = useState<number>(0.0);
    const [tds, setTds] = useState<number>(0.0);
    const [turbidity, setTurbidity] = useState<number>(0.0);

    const [temperature, setTemperature] = useState<number>(0.0);
    const [light, setlight] = useState<number>(0.0);
    const [uv, setuv] = useState<number>(0.0);

    //line charts 
    const [phlinechart, setphlinechart] = useState<any>(
        {
            labels: [],
            datasets: [
                {
                    label: 'pH',
                    data: [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        }
    )

    const [tdslinechart, settdslinechart] = useState<any>(
        {
            labels: [],
            datasets: [
                {
                    label: 'TDS',
                    data: [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        }
    )

    const [turblinechart, setturblinechart] = useState<any>(
        {
            labels: [],
            datasets: [
                {
                    label: 'TURBIDITY',
                    data: [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        }
    )

    const [templinechart, settemplinechart] = useState<any>(
        {
            labels: [],
            datasets: [
                {
                    label: 'TEMPERATURE',
                    data: [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        }
    )

    const [lightlinechart, setlightlinechart] = useState<any>(
        {
            labels: [],
            datasets: [
                {
                    label: 'LIGHT',
                    data: [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        }
    )

    const [uvlinechart, setuvlinechart] = useState<any>(
        {
            labels: [],
            datasets: [
                {
                    label: 'UV INDEX',
                    data: [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        }
    )

    const [predlinechart, setpredlinechart] = useState<any>(
        {
            labels: [],
            datasets: [
                {
                    label: 'HEALTH',
                    data: [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        }
    )

    
    

    const chartStyle = {
        height: 150,
    }

    const linechartoptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Time Series',
            },
        },
    };

    

    useIonViewDidEnter(() => {
        console.log('ionViewDidEnter event fired ' + deviceId);
        //setTemperature(Math.random());
        const pct = mapPercentage(7.2,0,15,0,100);
        console.log('pct', pct);

        fetchDeviceData();
    });

    useIonViewDidLeave(() => {
        console.log('ionViewDidLeave event fired');
    });

    const fetchDeviceData = async () => {
        try {
            const r: any = await API.graphql(graphqlOperation(getSmartLakeDevice, { id: deviceId }));
            const deviceData = r.data.getSmartLakeDevice;
            console.log(deviceData);
            setPh(deviceData.ph);
            setTemperature(deviceData.temperature);
            setTds(deviceData.tds);
            setTurbidity(deviceData.turbidity);
            setlight(deviceData.light);
            setuv(deviceData.uv);
            fetchDeviceLogs(deviceData.dev_eui);

        } catch (err) { console.log('error fetching devices') }
    }

    const fetchDeviceLogs = async (dev_eui:string) =>{
        const r: any = await API.graphql(graphqlOperation(listSmartLakeDeviceLogs, { dev_eui: dev_eui }));
        const logs = r.data.listSmartLakeDeviceLogs.items;
        logs.sort((m,n) => {return m.ts > n.ts ? 1:-1 });
        console.log(logs);
        
        let phLevels: number[] = [];
        let tdsLevels: number[] = [];
        let turbLevels: number[] = [];
        let tempLevels: number[] = [];
        let uvLevels: number[] = [];
        let lightLevels: number[] = [];
        let predLevels: number[] = [];

        let labels: string[] = [];
        logs.forEach((m:any)=>{
            let d = new Date(m.ts*1000);
            
            phLevels.push(m.ph);
            tdsLevels.push(m.tds);
            turbLevels.push(m.turbidity);
            tempLevels.push(m.temperature);
            lightLevels.push(m.light);
            uvLevels.push(m.uv);
            predLevels.push(m.clas);

            labels.push(d.getHours()+":"+d.getMinutes());

        })

       // phlinechart.labels = labels;
       // phlinechart.datasets[0].data = phLevels;

       // console.log(phlinechart);
        setphlinechart({
            labels: labels,
            datasets: [
                {
                    label: 'pH',
                    data: phLevels,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        });

        settdslinechart({
            labels: labels,
            datasets: [
                {
                    label: 'TDS',
                    data: tdsLevels,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        });

        setturblinechart({
            labels: labels,
            datasets: [
                {
                    label: 'TURBIDITY',
                    data: turbLevels,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        });

        settemplinechart({
            labels: labels,
            datasets: [
                {
                    label: 'TEMPERATURE',
                    data: tempLevels,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        });

        setuvlinechart({
            labels: labels,
            datasets: [
                {
                    label: 'UV INDEX',
                    data: uvLevels,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        });

        setlightlinechart({
            labels: labels,
            datasets: [
                {
                    label: 'LIGHT',
                    data: lightLevels,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        });

        setpredlinechart({
            labels: labels,
            datasets: [
                {
                    label: 'PREDICTION',
                    data: predLevels,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        });


    }

    const mapPercentage = (x: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    return (
        <IonPage>
            <IonContent class="ion-padding">
                <h3>Device {deviceId}</h3>
                <IonRow>
                    <IonCol sizeXs="12" sizeSm="6" sizeMd="4" >
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>pH</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                {/* <Line options={linechartoptions} data={linechartdata} /> */}
                                <GaugeChart style={chartStyle}
                                    nrOfLevels={3}
                                    colors={["#e91e63", "#00FF00","#e91e63"]} 
                                    percent={mapPercentage(ph,0,15,0,100)/100}
                                    formatTextValue={() => ph}
                                />
                                
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol sizeXs="12" sizeSm="6" sizeMd="4" >
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>TDS</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                
                                <GaugeChart style={chartStyle}
                                    nrOfLevels={3}
                                    percent={mapPercentage(tds,0,500,0,100)/100}
                                    formatTextValue={() => tds}
                                />
                                
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol sizeXs="12" sizeSm="6" sizeMd="4" >
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>TURBIDITY</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                
                                <GaugeChart style={chartStyle}
                                    nrOfLevels={3}
                                    percent={mapPercentage(turbidity,0,5,0,100)/100}
                                    formatTextValue={() => turbidity}
                                />
                                
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
                <IonRow>
                <IonCol sizeXs="12" sizeSm="6" sizeMd="4" >
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>pH</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <Line options={linechartoptions} data={phlinechart} />
                               
                                
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol sizeXs="12" sizeSm="6" sizeMd="4" >
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>TDS</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <Line options={linechartoptions} data={tdslinechart} />
                               
                                
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol sizeXs="12" sizeSm="6" sizeMd="4" >
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>TURBIDITY</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <Line options={linechartoptions} data={turblinechart} />
                               
                                
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
                <IonRow>
                <IonCol sizeXs="12" sizeSm="6" sizeMd="4" >
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>TEMPERATURE</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                {/* <Line options={linechartoptions} data={linechartdata} /> */}
                                <GaugeChart style={chartStyle}
                                    nrOfLevels={3}
                                    colors={["#e91e63", "#00FF00","#e91e63"]} 
                                    percent={mapPercentage(temperature,40,120,0,100)/100}
                                    formatTextValue={() => temperature}
                                />
                                
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol sizeXs="12" sizeSm="6" sizeMd="4" >
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>UV INDEX</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                
                                <GaugeChart style={chartStyle}
                                    nrOfLevels={3}
                                    percent={mapPercentage(uv,0,15,0,100)/100}
                                    formatTextValue={() => uv}
                                />
                                
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol sizeXs="12" sizeSm="6" sizeMd="4" >
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>LIGHT</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                
                                <GaugeChart style={chartStyle}
                                    nrOfLevels={3}
                                    percent={mapPercentage(light,0,15,0,100)/100}
                                    formatTextValue={() => light}
                                />
                                
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
                <IonRow>
                <IonCol sizeXs="12" sizeSm="6" sizeMd="4" >
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>TEMPERATURE</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <Line options={linechartoptions} data={templinechart} />
                               
                                
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol sizeXs="12" sizeSm="6" sizeMd="4" >
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>UV</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <Line options={linechartoptions} data={uvlinechart} />
                               
                                
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                    <IonCol sizeXs="12" sizeSm="6" sizeMd="4" >
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>LIGHT</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <Line options={linechartoptions} data={lightlinechart} />
                               
                                
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}

export default Device;