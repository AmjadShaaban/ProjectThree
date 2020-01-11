import axios from 'axios';
import React, { Component } from 'react';

interface MenuItem {
  _id: string;
  name: string;
}

interface Props {}
interface State {
  menu: MenuItem[];
}

export default class Menu extends Component<Props, State> {
  state = {
    menu: [] as MenuItem[]
  };

  async componentDidMount() {
    try {
      const resoponse = await axios.get('/menu');
      this.setState({ menu: resoponse.data.menu });
    } catch (error) {}
  }

  render() {
    return this.state.menu.map(item => {
      return <div key={item._id}>Title: {item.name}</div>;
    });
  }
}
