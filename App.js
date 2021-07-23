import React, {useState} from 'react';
import {Button, Linking, Platform, Picker, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View, TouchableWithoutFeedbackCompo, Platformnent} from 'react-native';

export default function App() {
  const [number , setNumber] = useState('')
  const [message, setMessage] = useState('')
  const [messageTemplate, setMessageTemplate] = useState(['Templates de Mensagens', 0])
  const [errors, setErrors] = useState([''])
  const labelsTemplate = [
    'Templates de Mensagens',
    'Bom Dia',
    'Boa Tarde', 
    'Boa Noite',
  ]
  const onChangeMessage = (itemValue, itemIndex) => {
    if(itemValue != 0) setMessage(labelsTemplate[itemValue])
    else setMessage('')
    setMessageTemplate([itemValue, itemIndex])
  }
  const onChangedInputNumber = (text) =>{ 
    text = text.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, '($1) $2 $3-$4')
    setNumber(text)
  }
  const sendMessage = () => {
    if(!number || number.length < 16) errors.push('number')
    else errors.splice(errors.indexOf('number'), 1)
    if(!message) errors.push('message')
    else errors.splice(errors.indexOf('Message'), 1)
    if(number && number.length == 16 && message){
      Linking.openURL(`whatsapp://send?text=${message}&phone=${'+55'+number}`)
    }
  }
  return (
    <SafeAreaView style={styles.androidSafe}>
      <ScrollView>
      <View style={styles.head}>
        <Text style={styles.headTitle}>MEGACHAT</Text>
      </View>
      
      <View>
        <View style={styles.container}>
          <Text style={styles.label}>Numero :</Text>
          <TextInput
            maxLength={16}
            keyboardType='numeric'
            style={{ 
              borderColor: errors.includes('number') ? 'red' : '#222',
              borderWidth: 1,
              borderRadius: 10,
              height: 50,
              width: 350,
              paddingLeft: 10,
              fontSize: 16
            }}
            onChangeText={(text) => {onChangedInputNumber(text)}}
            value = {number}
            />
          </View>
        <View style={styles.container}>
          <Text style={styles.label}>Mensagem :</Text>
          <TextInput 
            style={{ 
              borderColor: errors.includes('message') ? 'red' : '#222',
              borderWidth: 1,
              borderRadius: 10,
              height: 160,
              width: 350,
              textAlignVertical: 'top',
              fontSize: 16,
              padding: 10
            }}
            multiline={true}
            onChangeText={(text) => {setMessage(text)}}
            value = {message}
          />
          <View style ={styles.pickerMessage}>
          <Picker
            selectedValue={messageTemplate[0]}
            onValueChange={(itemValue, itemIndex) => {onChangeMessage(itemValue, itemIndex)}}
            >
            {
              labelsTemplate.map((labels, i) => {
                return(<Picker.Item  key={i} label={labels} value={i}/>)
              })
            }
          </Picker>
          </View>
        </View>
        <View style={styles.container}>  
          <Text style={styles.label2}>Resultado :</Text>
          <Text style={styles.resultBox}>
            Numero: {number} {'\n'}
            Mensagem: {message}
          </Text>
        </View>
        <View style={styles.containerButton}>
          <Button color={'blue'} title='Enviar' onPress={() => {sendMessage()}}/>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  androidSafe : {
    marginTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  head : {
    backgroundColor: 'blue'
  },
  headTitle : {
    color: '#fff',
    fontSize: 28,
    letterSpacing: 1,
    textAlign: 'center',
    padding: 10,
  },
  container : {
    margin: 30,
    marginBottom: 20,
    marginTop: 20,
  },
  label : {
    fontSize: 18,
    paddingBottom: 10,
  },
  label2 : {
    fontSize: 18,
    paddingBottom: 10,
    color: 'blue'
  },
  pickerMessage : { 
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: 350
  },
  resultBox:{
    fontSize: 16,
    borderColor: 'blue',
    borderRadius: 10,
    borderWidth: 1,
    width: 350,
    padding: 15,
    color: 'blue',
  },
  containerButton : {
    margin: 30,
    borderRadius: 10,
    fontSize: 18,
    width: 350,
  },
})