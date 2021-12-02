import React, { useEffect, useState} from 'react';
import styles from './styles.module.scss';
import Button from '../../../../Global-Components/Button';
import ModalTable from './ModalTable';

const Listing = ({handleClose, nfts, nftSelected, setNft}) => {
    const [nftListing, setNftListing] = useState([]);
    const [indexSelected, setIndexSelected] = useState(0);

    useEffect(
        ()=> {
        //Lógica para filtrar a los NFTS según su descripcion y ordenar por precio
        const nftsFiltrados = nfts.filter(nft => nft.title1 === "Rare Skin for Letti");
        nftsFiltrados.sort( (a,b) => a.price - b.price)
        setNftListing(nftsFiltrados);

        //Seleccionamos el index del elemento seleccionado dentro del array de filtrados.
        const index = nftsFiltrados.findIndex(nft => nft.id === nftSelected.id);
        setIndexSelected(index);

    }, [nfts, nftSelected])

    //Index ok. Hay que pintar de ahí para abajo
    //console.log(indexSelected);

    const handleBuy = (nft) => {
        console.log(nft)
        setNft(nft);
    }

    const TableContent = () => {
        return (
            <>
            {nftListing.map( (nft, index) => {
                if (index === indexSelected) {
                    return <tr key={nft.serial}>
                        <td style= {{backgroundColor: '#1892F0'}}>{nft.serial}</td>
                        <td style= {{backgroundColor: '#1892F0'}}>{nft.seller}</td>
                        <td style= {{backgroundColor: '#1892F0'}}>{nft.price}</td>
                        <td><Button title="Buy" onClick={()=> handleBuy(nft)} width={"100%"}/></td>
                    </tr>
                }
                else if (index < indexSelected){
                    return <tr key={nft.serial}>
                        <td style={{backgroundColor: 'rgba(24, 146, 240, 0.44)'}}>{nft.serial}</td>
                        <td style={{backgroundColor: 'rgba(24, 146, 240, 0.44)'}}>{nft.seller}</td>
                        <td style={{backgroundColor: 'rgba(24, 146, 240, 0.44)'}}>{nft.price}</td>
                        <td><Button title="Buy" onClick={()=> handleBuy(nft)} width={"100%"}/></td>
                    </tr>
                }
                else {
                    return <tr key={nft.serial}>
                        <td>{nft.serial}</td>
                        <td>{nft.seller}</td>
                        <td>{nft.price}</td>
                        <td><Button title="Buy" onClick={()=> handleBuy(nft)} width={"100%"}/></td>
                    </tr>
                }
            } )}
            </>
        )
    }

    const nftName = "Tron Warrior"
    return (
        <div className={styles.parentContainerModal}>
            <ModalTable title={`${nftName} Full Listing`} handleClose = {handleClose}>
                <h2>Tron</h2>
                <table className = {styles.tableList}>
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Seller</th>
                            <th>NCoin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableContent/>
                    </tbody>
                </table>
            </ModalTable>
        </div>
    )
}

export default Listing;
