import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerContainer: {
    backgroundColor: '#fc038c',
    justifyContent: 'space-around',
  },
  innerContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterHeader: {
    width: 180,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  filterTag: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#fc038c'
  },
  filterDisable: {
    backgroundColor: 'gray'
  },
  filterText: {
    color: '#fff'
  },
  gridView: {
    flex: 1,
    marginVertical: 20
  },
  itemInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemContainer: {
    borderRadius: 5,
    padding: 10,
    height: 150,
    backgroundColor: '#fc038c',
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginVertical: 10
  },
  itemFace: {
    color: '#fff'
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  skeletonFirstRow: {
    flexDirection: 'row',
    marginTop: -10,
    marginHorizontal: 10
  },
  skeletonSecondRow: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10
  },
  skeletonItemLeft: {
    flex: 1,
    width: '50%',
    marginRight: 10
  },
  skeletonItemRight: {
    flex: 1,
    width: '50%',
  },
  endText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 15,
    marginBottom: 20
  }
})
