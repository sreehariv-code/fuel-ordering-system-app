import React from 'react';
import ToggleButton from '../components/ToggleButton';
import color from '../config/color';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Statusbar from '../components/Statusbar';

const DstrProfile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{justifyContent:"center"}}>
          <Statusbar heading={"PROFILE"} condition={"1"} navigation={navigation}/>
          <View style={styles.buttonStyle}>
            <ToggleButton />
          </View>
      </View>
      
      <View style={styles.profileContainer}>
        <Image
          style={styles.profilePicture}
          source={{ uri: 'https://media.istockphoto.com/id/179014050/photo/portrait-of-a-young-adult.jpg?s=1024x1024&w=is&k=20&c=GeyRD9BFxLoZd-CXDIPovc5LHiUt_g47YOxKhrrBBe8=' }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Sachin</Text>
          <Text style={styles.profileContact}>123-456-7888</Text>
          <Text style={styles.profileEmail}>sachi@email.com</Text>
          <View style={styles.box}> 
            <Text style={styles.profileAddr}>LIC 12345678</Text>
            <Text style={styles.profileAddr}>xyz fuels</Text>
            <Text style={styles.profileAddr}>abc street</Text>
          </View>
          
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>20</Text>
          <Text style={styles.statLabel}>Orders Completed</Text>
        </View>
        <View style={[styles.statBox, { marginLeft: 20 }]}>
          <Text style={styles.statNumber}>4.5</Text>
          <Text style={styles.statLabel}>Customer Rating</Text>
        </View>
      </View >
      <View style={{justifyContent:"center",flexDirection:"row",paddingHorizontal:100}}>
      <TouchableOpacity style={styles.editButton}>
        <View style={{justifyContent:"center",alignItems:"center",}}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editButton}>
        <View style={{justifyContent:"center",alignItems:"center"}}>
          <Text style={styles.editButtonText}>Log Out</Text>
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
   
  },
  header: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginBottom: 20
  },
  headerText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:15,
    borderRadius:5,
    borderWidth:1.5,
    borderColor:color.primary,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20
  },
  profileInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom:6,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  profileContact: {
    fontSize: 18
  },
  buttonStyle: {
    position: 'absolute',
    right: 10,
  },
  profileEmail: {
    fontSize: 18
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent:"center",
    alignItems:"center"
  },
  profileAddr:{
    fontSize:15,
  },
  statBox: {
    alignItems: 'center'
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  statLabel: {
    fontSize: 18
  },
  editButton: {
    backgroundColor: color.primary,
    borderRadius: 5,
    width:"90%",
    height:"30%",
    justifyContent :"center",
    alignContent:'center',
    marginHorizontal:15,
  },

  box:{
    borderRadius:5,
    borderColor:color.primary,
    borderWidth:1.5,
    borderStyle:"dotted",
    padding:5,
    marginTop:5,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    
    
  }
});

export default DstrProfile;