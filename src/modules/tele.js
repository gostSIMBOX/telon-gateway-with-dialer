import React, { Component } from 'react'
import TeleEndpoint from './tele_endpoint'

export default class Tele extends Component {
  constructor() {
    super();
    this.tEndpoint=new TeleEndpoint();
  };

  async componentDidMount() {
    Rec=this.tEndpoint.Rec;
  }
}




