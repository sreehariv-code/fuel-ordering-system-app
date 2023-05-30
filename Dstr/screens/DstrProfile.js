import React from 'react';
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
      <Statusbar heading={"PROFILE"} condition={"1"} navigation={navigation}/>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profilePicture}
          source={{ uri: 'https://media.istockphoto.com/id/179014050/photo/portrait-of-a-young-adult.jpg?s=1024x1024&w=is&k=20&c=GeyRD9BFxLoZd-CXDIPovc5LHiUt_g47YOxKhrrBBe8=' }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Sachin</Text>
          <Text style={styles.profileContact}>123-456-7888</Text>
          <Text style={styles.profileEmail}>sachi@email.com</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>20</Text>
          <Text style={styles.statLabel}>Orders Completed</Text>
        </View>
        <View style={[styles.statBox, { marginLeft: 20 }]}>
          <Text style={styles.statNumber}>4.5</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20
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
    marginBottom: 20,
    marginTop:30,
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
    alignItems: 'center',
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
    backgroundColor: '#000',
    borderRadius: 5,
    width:170,
    justifyContent :"center",
    alignContent:'center'
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    
    
  }
});

export default DstrProfile;