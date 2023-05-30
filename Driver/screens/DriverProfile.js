import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Statusbar from '../components/Statusbar'
import color from '../config/color';


const DriverProfile = ({name,phone,mail,o_comp,rat}) => {
  return (

    <View >
       <Statusbar heading={"DRIVER PROFILE"} condition={"1"}/>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profilePicture}
          source={{ uri: 'https://media.istockphoto.com/id/179014050/photo/portrait-of-a-young-adult.jpg?s=1024x1024&w=is&k=20&c=GeyRD9BFxLoZd-CXDIPovc5LHiUt_g47YOxKhrrBBe8=' }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileContact}>{phone}</Text>
          <Text style={styles.profileEmail}>{mail}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{o_comp}</Text>
          <Text style={styles.statLabel}>Orders Completed</Text>
        </View>
        <View style={[styles.statBox, { marginLeft: 20 }]}>
          <Text style={styles.statNumber}>{rat}</Text>
          <Text style={styles.statLabel}>Star Rating</Text>
        </View>
      </View >
      <View style={{justifyContent:"center",alignItems:"center"}}>
      <TouchableOpacity style={styles.editButton}>
        <View style={{justifyContent:"center",alignItems:"center"}}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
        </View>
        
      </TouchableOpacity>
      </View>
    </View>
   
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent:"center",
    alignItems: 'center',
    padding:30
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20
  },
  profileInfo: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  profileContact: {
    fontSize: 18
  },
  profileEmail: {
    fontSize: 18
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    justifyContent:"center",
    alignItems:"center"
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
    backgroundColor:color.primary,
    borderRadius: 5,
    width:170,
    justifyContent :"center",
    alignContent:'center'
  },
  editButtonText: {
    color: color.secondary,
    fontSize: 18,
    fontWeight: 'bold',
    
    
  }
});

export default DriverProfile;