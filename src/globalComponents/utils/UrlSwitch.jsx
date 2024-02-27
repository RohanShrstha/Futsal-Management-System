import React, { useState } from 'react'

const UrlSwitch = () => {

    const caseCoolerPcUrl = "http://localhost:8081/case-cooler-pc"//working
    const casesPcUrl = "http://localhost:8081/cases-pc" //working
    const cpuCoolerUrl = "http://localhost:8081/cpu-cooler"//with coolerType working
    const externalStorageUrl = "http://localhost:8081/external-storage"//working
    const graphicsCardUrl = "http://localhost:8081/graphicsCard" //working
    const headphoneUrl = "http://localhost:8081/headphone"//working
    const keyboardUrl = "http://localhost:8081/keyboard" //working
    const laptopsUrl = "http://localhost:8081/laptops" //working
    const monitorUrl = "http://localhost:8081/monitor" //working
    const mouseUrl = "http://localhost:8081/mouse" //working
    const motherboardUrl = "http://localhost:8081/motherboard" //working
    const opticalReaderUrl = "http://localhost:8081/opticalReader" //working
    const powerSupplyUrl = "http://localhost:8081/powerSupply" //working
    const processorUrl = "http://localhost:8081/processor"; //working
    const ramUrl = "http://localhost:8081/ram"; //working
    const softwaresUrl = "http://localhost:8081/softwares"; //working with softwareType
    const soundCardUrl = "http://localhost:8081/soundcard"; //working
    const speakersUrl = "http://localhost:8081/speakers"; //working
    const storageHDDUrl = "http://localhost:8081/storageHDD"; //working
    const storageSSDUrl = "http://localhost:8081/storageSSD"; //working
    const thermalpasteUrl = "http://localhost:8081/thermalpaste"; //working
    const upsUrl = "http://localhost:8081/ups"; //working
    const webcamUrl = "http://localhost:8081/webcam"; //working
    const WiredNetworkAdapterUrl = "http://localhost:8081/wiredNetworkAdapter"; //working
    const WirelessNetworkAdapterUrl = "http://localhost:8081/wirelessNetworkAdapter"; //working

    const [url, setUrl] = useState({});
    
    const getUrl = (categoryId)=>{
        switch(categoryId){
            case '5':
                return caseCoolerPcUrl;
                break;
            case '6':
                return casesPcUrl
                break;
            case '7':
                return cpuCoolerUrl
                break;
            case '8':
                return externalStorageUrl
                break;
            case '9':
                return graphicsCardUrl
                break;
            case '10':
                return headphoneUrl
                break;
            case '3':
                return laptopsUrl
                break;
            case '11':
                return monitorUrl
                break;
            case '12':
                return motherboardUrl
                break;
            case '13':
                return mouseUrl
                break;
            case '14':
                return opticalReaderUrl
                break;
            case '15':
                return powerSupplyUrl
                break;
            case '16':
                return processorUrl
                break;
            case '17':
                return ramUrl
                break;
            case '18':
                return softwaresUrl
                break;
            case '19':
                return soundCardUrl
                break;
            case '20':
                return speakersUrl
                break;
            case '21':
                return storageHDDUrl
                break;
            case '22':
                return storageSSDUrl
                break;
            case '23':
                return thermalpasteUrl
                break;
            case '24':
                return upsUrl
                break;
            case '25':
                return webcamUrl
                break;
            case '26':
                return WiredNetworkAdapterUrl
                break;
            case '27':
                return WirelessNetworkAdapterUrl
                break;
            case '28':
                return keyboardUrl
                break;
            default:
                return (
                "invalid url"
                )   
        }
    }

    return {getUrl};
}

export default UrlSwitch