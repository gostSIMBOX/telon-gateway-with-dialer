import React, { Component } from 'react'
import TeleEndpoint from './tele_endpoint'

export default class Tele extends Component {
  constructor() {
    super();
    this.tEndpoint=new TeleEndpoint();
    this.Rec=this.tEndpoint.Rec;
  };
/*
  async componentDidMount() {
    Rec=this.tEndpoint.Rec;
  }*/
/*
  Rec = async (data) => {
    console.log("Rec",data);

  }*/
}




