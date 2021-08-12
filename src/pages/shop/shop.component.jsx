import React from "react";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import {selectIsCollectionFetching,selectIsCollectionsLoaded} from  '../../redux/shop/shop.selectors';

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {
  

  componentDidMount() {
      const {fetchCollectionsStartAsync} = this.props;
      fetchCollectionsStartAsync();
  }

  render() {
    const { match,isFetchingCollections,isCollectionsLoaded } = this.props;
   
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} 
        render={(props)=>(<CollectionsOverviewWithSpinner isLoading={isFetchingCollections} {...props}/>)} 

        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props)=>(<CollectionsPageWithSpinner isLoading={!isCollectionsLoaded} {...props}/>)}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFetchingCollections: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
