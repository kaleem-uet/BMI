import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  LogBox,
  ToastAndroid,
} from 'react-native';
import {Modal, Portal, Provider} from 'react-native-paper';

const Home = navigation => {
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setheight] = useState(0);

  const [male, setmale] = useState(false);
  const [female, setfemale] = useState(false);
  const [visible, setVisible] = useState(false);
  const [result,setResult]=useState(0);
  const [categoryRe,setCategoryRe]=useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: '#333436', padding: 20,height:500,margin:30};

  
  useEffect(() => {
     setheight(0); 
    setmale(false);
     setfemale(false)
     setAge(0);
     setWeight(0);
  }, []);
  const CalculateBMI=()=>{
    if(male || female)
    {
    let bmi;
    let category;
   let cm=height * 2.54
    bmi = (weight / Math.pow( (cm/100), 2 )).toFixed(1);
    setResult(bmi);
    console.log(bmi);
    if(bmi < 18.5){
      category = "Underweight 😒";
      // result.style.color = "#ffc44d";
  }

//If BMI is >=18.5 and <=24.9
  else if( bmi >= 18.5 && bmi <= 24.9 ){
      category = "Normal Weight 😍";
      // result.style.color = "#0be881";
  }

//If BMI is >= 25 and <= 29.9 
  else if( bmi >= 25 && bmi <= 29.9 ){
      category = "Overweight 😮";
      // result.style.color = "#ff884d";
  }

//If BMI is <= 30
  else{
      category = "Obese 😱";
      // result.style.color = "#ff5e57";
  }
    setVisible(true)
    setCategoryRe(category);
    }
    else{
      ToastAndroid.showWithGravityAndOffset(
        "Please select gender",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: '#222224'}}>
      <Provider>
        <View>
          <View
            style={{
              flexDirection: 'row',
              margin: 20,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setmale(true)}
              style={{
                width: 130,
                height: 130,
                backgroundColor: '#333436',
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 20,
                shadowColor: 'gray',
                borderRadius: 10,
              }}>
              <View style={{padding: 10}}>
                <Image
                  source={require('../assets/img/male.png')}
                  style={{width: 70, height: 70}}
                />
              </View>
              <View>
                <Text style={{color: 'white', fontSize: 18, fontWeight: '400'}}>
                  MALE
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.86}
              onPress={() => setfemale(true)}
              style={{
                width: 130,
                height: 130,
                backgroundColor: '#333436',
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 20,
                shadowColor: 'gray',
                borderRadius: 10,
              }}>
              <View style={{padding: 10}}>
                <Image
                  source={require('../assets/img/female.png')}
                  style={{width: 70, height: 70}}
                />
              </View>
              <View>
                <Text style={{color: 'white', fontSize: 18, fontWeight: '400'}}>
                  FEMALE
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <Height height={height} setheight={setheight} />
          </View>
          <WeightAndAge
            weight={weight}
            setWeight={setWeight}
            age={age}
            setAge={setAge}
          />
        </View>
        <Portal>
          <Modal
           
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 30, color:"white", fontWeight: '900'}}>
                YOU RESULT IS
              </Text>
              <Text style={{fontSize:35, fontWeight: '900', color: 'green',marginTop:20}}>
                {result}
              </Text>
              <Text style={{fontSize:24, fontWeight: '400', color: 'white',marginTop:20}}>
                Normal BMI Range
              </Text>
              <Text style={{fontSize:24, fontWeight: '400', color: 'white',marginTop:20}}>
                18 - 25 kg m^2
              </Text>
              <Text style={{fontSize:24, textAlign:"center", fontWeight: '400', color: 'white',marginTop:20}}>
                {categoryRe}
              </Text>
              <TouchableOpacity
              onPress={()=>{setVisible(false)}}
              activeOpacity={0.56}

                style={{
                  width: '50%',
                  height: 40,
                  backgroundColor: '#fc037b',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop:60
                }}>
                <Text style={{fontSize: 24, fontWeight: '600', color: 'white'}}>
                  save
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
      </Provider>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          disabled={(height==0  || age==0  ||  weight==0 ) ? true:false }
          onPress={CalculateBMI}
          activeOpacity={0.56}
          style={{
            width: '95%',
            height: 50,
            backgroundColor:(height==0 || weight==0 || age==0) ? "black" :'#fc037b',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            borderRadius: 5,
            elevation: 10,
          }}>
          <Text style={{color: 'white', fontSize: 24, fontWeight: '600'}}>
            CALCULATE YOUR BMI
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Height = ({height, setheight}) => {
  return (
    <View
      style={{
        marginTop: 30,
        width: '80%',
        height: 160,
        backgroundColor: '#333436',
        borderRadius: 10,
        elevation: 20,
        shadowColor: 'gray',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 18,
          fontWeight: '400',
          marginTop: 10,
        }}>
        Height
      </Text>
      <Text
        style={{
          color: 'white',
          fontSize: 30,
          fontWeight: '900',
          marginTop: 10,
        }}>
        {height} inch
      </Text>
      <View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity
            activeOpacity={0.56}
            onPress={() => {
              setheight(height == 0 ? height : height - 1);
            }}
            style={{
              width: 50,
              height: 40,
              backgroundColor: 'black',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 30, fontWeight: '600'}}>
              -
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.56}
            onPress={() => {
              setheight(height + 1);
            }}
            style={{
              width: 50,
              height: 40,
              backgroundColor: 'black',
              borderRadius: 20,
              marginLeft: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 30, fontWeight: '600'}}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const WeightAndAge = ({weight, setWeight, age, setAge}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{
          width: 140,
          height: 170,
          backgroundColor: '#333436',
          alignItems: 'center',
          elevation: 20,
          shadowColor: 'gray',
          borderRadius: 10,
        }}>
        <View style={{marginTop: 10}}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '400'}}>
            WEIGHT
            <Text style={{color: 'white', fontSize: 14}}> ' KG</Text>
          </Text>

          <View style={{alignItems: 'center', marginTop: 5}}>
            <Text style={{color: 'white', fontSize: 30, fontWeight: '900'}}>
              {weight}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <TouchableOpacity
            activeOpacity={0.56}
            onPress={() => {
              setWeight(weight == 0 ? weight : weight - 1);
            }}
            style={{
              width: 50,
              height: 40,
              backgroundColor: 'black',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 30, fontWeight: '600'}}>
              -
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.56}
            onPress={() => {
              setWeight(weight + 1);
            }}
            style={{
              width: 50,
              height: 40,
              backgroundColor: 'black',
              borderRadius: 20,
              marginLeft: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 30, fontWeight: '600'}}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>

      <View
        style={{
          width: 140,
          height: 170,
          backgroundColor: '#333436',
          alignItems: 'center',
          elevation: 20,
          shadowColor: 'gray',
          borderRadius: 10,
        }}>
        <View style={{marginTop: 10}}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '400'}}>
            AGE
          </Text>
          <View style={{alignItems: 'center', marginTop: 5}}>
            <Text style={{color: 'white', fontSize: 30, fontWeight: '900'}}>
              {age}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <TouchableOpacity
            activeOpacity={0.56}
            onPress={() => {
              setAge(age == 0 ? age : age - 1);
            }}
            style={{
              width: 50,
              height: 40,
              backgroundColor: 'black',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 30, fontWeight: '600'}}>
              -
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.56}
            onPress={() => {
              setAge(age + 1);
            }}
            style={{
              width: 50,
              height: 40,
              backgroundColor: 'black',
              borderRadius: 20,
              marginLeft: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 30, fontWeight: '600'}}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
