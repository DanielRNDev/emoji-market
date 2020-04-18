import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image
} from 'react-native'
import PropTypes from 'prop-types'
import SkeletonContent from "react-native-skeleton-content-nonexpo"
import { FlatGrid } from 'react-native-super-grid'
import { Header } from 'react-native-elements'
import axios from 'axios'
import _ from 'lodash'
import {
  getDateFromNow,
  isCloseToTop,
  formatCurrency,
  debounceEventHandler,
  getItemWidth,
  getArrayWithAds
} from '../../utils'
import styles from './styles'

const AD_OFFSET = 20
const LIMIT = 8
const getProductsURL = (page, filter) => `http://localhost:3000/products?_page=${page}&_limit=${LIMIT}&_sort=${filter}`
const itemWidth = getItemWidth()

export default class Dashboard extends Component {
  state = {
    value: '',
    data: [],
    loading: true,
    page: 1,
    isLastPage: false,
    filter: 'price'
  }

  componentDidMount = async () => {
    const { page, filter } = this.state
    const { data } = await axios.get(getProductsURL(page, filter))

    this.setState({ data: getArrayWithAds(data, AD_OFFSET), loading: false })
  }

  onFilterPress = (filter) => {
    this.setState({ data: [], loading: true, filter, isLastPage: false }, async () => {
      const { data } = await axios.get(getProductsURL(1, filter))

      this.setState({ data: getArrayWithAds(data, AD_OFFSET), page: 1, loading: false })
    })
  }

  onLoadMore = (e) => {
    const { loading, page, data, isLastPage, filter } = this.state

    if (isCloseToTop(e.nativeEvent) && !loading && !isLastPage) {
      this.setState({ loading: true }, async () => {
        const { data: resData } = await axios.get(getProductsURL(page + 1, filter))
        if (_.isEmpty(resData)) {
          this.setState({
            isLastPage: true,
            loading: false
          })
        } else {
          this.setState({
            data: getArrayWithAds(data.concat(resData), AD_OFFSET),
            page: page + 1,
            loading: false
          })
        }
      })
    }
  }

  onPressEmojiItem = (item) => {
    console.log(item);
  }

  renderFilterTag = (filter) => (
    <TouchableOpacity
      style={[styles.filterTag, this.state.filter !== filter && styles.filterDisable]}
      onPress={() => this.onFilterPress(filter)}
    >
      <Text style={styles.filterText}>{_.upperCase(filter)}</Text>
    </TouchableOpacity>
  )

  renderFilter = () => (
    <View style={styles.filterHeader}>
      {this.renderFilterTag('price')}
      {this.renderFilterTag('size')}
      {this.renderFilterTag('id')}
    </View>
  )

  renderSkeleton = () => {
    const { isLastPage } = this.state

    if (isLastPage) return null

    return (
      <React.Fragment>
        <View style={styles.skeletonFirstRow}>
          <SkeletonContent
            containerStyle={styles.skeletonItemLeft}
            isLoading={true}
            animationDirection="horizontalLeft"
            duration={1000}
            layout={[{ width: itemWidth, height: 150, borderRadius: 5 }]}
            boneColor="#E1E9EE"
          />
          <SkeletonContent
            containerStyle={styles.skeletonItemRight}
            isLoading={true}
            animationDirection="horizontalLeft"
            duration={1000}
            layout={[{ width: itemWidth, height: 150, borderRadius: 5 }]}
            boneColor="#E1E9EE"
          />
        </View>
        <View style={styles.skeletonSecondRow}>
          <SkeletonContent
            containerStyle={styles.skeletonItemLeft}
            isLoading={true}
            animationDirection="horizontalLeft"
            duration={1000}
            layout={[{ width: itemWidth, height: 150, borderRadius: 5 }]}
            boneColor="#E1E9EE"
          />
        </View>
      </React.Fragment>
    )
  }

  renderEmojiItem = ({ item }) => {
    const { size, face, price, date, background, adUrl } = item

    if (adUrl) {
      return (
        <Image source={{ uri: adUrl }} style={{ width: '100%', height: 100 }} />
      )
    }

    return (
      <TouchableOpacity style={[styles.itemContainer, { backgroundColor: background }]} onPress={() => this.onPressEmojiItem(item)}>
        <View style={styles.itemInnerContainer}>
          <Text style={[styles.itemFace, { fontSize: size }]}>{face}</Text>
        </View>
        <View style={styles.line} />
        <React.Fragment>
          <Text style={styles.itemName}>{formatCurrency(price)}</Text>
          <Text style={styles.itemCode}>{`Added: ${getDateFromNow(date)}`}</Text>
        </React.Fragment>
      </TouchableOpacity>
    )
  }

  renderEmojiList = () => {
    const { data } = this.state

    return (
      <FlatGrid
        itemDimension={130}
        items={data}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        scrollEventThrottle={400}
        onScroll={debounceEventHandler(this.onLoadMore, 200)}
        showsVerticalScrollIndicator={false}
        renderItem={this.renderEmojiItem}
        ListFooterComponent={this.renderSkeleton}
      />
    );
  }

  render() {
    const { isLastPage } = this.state

    return (
      <View style={styles.container}>
        <Header
          barStyle="light-content"
          centerComponent={{ text: 'Emoji Market (•◡•)/ (⌐■_■)', style: { color: '#fff', fontWeight: 'bold' } }}
          containerStyle={styles.headerContainer}
        />
        <View style={styles.innerContainer}>
          {this.renderFilter()}
          {this.renderEmojiList()}
          {isLastPage && <Text style={styles.endText}>~ end of catalogue ~</Text>}
        </View>
      </View>
    )
  }
}

Dashboard.propTypes = {
  navigation: PropTypes.object
}
