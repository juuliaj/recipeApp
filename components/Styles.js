import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  listContainer: {
    flex: 1,
    width: 350,
    fontSize: 30,
    borderRadius: 50,
    padding: 10,
    backgroundColor: 'rgb(255,250,244)',
  },
  ingredientContainer: {
    flex: 1,
    flexDirection: 'row', 
    flexWrap: "wrap",
    justifyContent: 'space-between',
    padding: 10,
    fontWeight: "bold"
  },
  shoppingListContainer: {
    flex: 1,
    width: 350,
    flexDirection: 'row',
    fontSize: 30,
    borderRadius: 50,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'rgb(255,250,244)',
  },
  buttonContainer1: {
    flex: 4,
    width: 200,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderRadius: 50,
  },
  button: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "rgb(104,168,102)",
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
    height: '100%'
  },
  textInput: {
    fontSize: 30,
    marginTop: 15,
    marginBottom: 15,
  },
  textContainer: {
    fontSize: 30,
    padding: 20
  },
  headerContainer: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  textContainerSmall: {
    fontSize: 15,
    padding: 20,
  },
  recipeContainerBig: {
    fontSize: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  recipeContainerText: {
    fontSize: 15,
    padding: 10,
  }
});

export default styles;