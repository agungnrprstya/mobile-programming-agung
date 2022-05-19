import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Appbar, Button, List } from 'react-native-paper';
import supabase from '../supabase';

function KategoriScreen({navigation}) {
  const [data, setData] = useState([]);
  const setIcon = (status) => {
    var Icon = (!status) ? "close":"check";
    return Icon;
  }

  //script dijalankan ketika screen diakses
  useEffect(() => {
    getData();
  }, [data]);

  const getData = async() => {
    //data : hasil query, error : pesan error
    const { data, error } = await supabase
                              .from('Kategori')
                              .select('id, nama, penerbit, status')
                              .order('nama', {ascending:false});
    // console.log(error)
    setData(data);
  }

  return (
    <>
        <Appbar.Header>
            <Appbar.Content title="Kategori" />
        </Appbar.Header>

        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
                <List.Item
                  key={index}
                  title={item.nama}
                  description={item.penerbit}
                  left={props => <List.Icon {...props} 
                                    icon={setIcon(item.status)}
                                  />}
                  right={props => <List.Icon {...props} icon="pencil" />}
                  onPress={() => navigation.navigate('KategoriUbahScreen', {id: item.id})}
                />
              )}
        />

        <Button 
            icon="plus" 
            mode="contained" 
            onPress={() => navigation.navigate('KategoriTambahScreen')}
            style={{margin:10}}
        >
          Tambah Kategori
        </Button>
    </>
  );
}

export default KategoriScreen;