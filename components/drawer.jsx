import React from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { PageHeader } from 'antd';
import '../styles/Drawer.module.css'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, InfoOutlined } from '@ant-design/icons';

const consts = require('../consts.json');

const routes = [{
    path: 'index',
    breadcrumbName: 'First-level Menu',
},
{
    path: 'first',
    breadcrumbName: 'Second-level Menu',
},
{
    path: 'second',
    breadcrumbName: 'Third-level Menu',
},
];

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const window = require("global/window");

class Drawer extends React.Component {

    constructor(props) {
        super(props)

        let path = props.path === undefined ? ['Home'] : props.path;

        if (typeof (path) === "string")
            path = path.split("/")

        this.state = {
            body: props.body,
            path: path,
        }
    }

    componentDidUpdate() {
        if (this.state.body !== this.props.body) {
            this.setState({ body: this.props.body })
        }
    }

    render() {

        const minHeight = "95%"; //this.state.body.innerHeight > window.outerHeight ? this.state.body.innerHeight : window.outerHeight
        const { router } = this.props;
        console.log(router);

        const routes = router.route.split("/");

        console.log(routes);

        return <Layout>
            <PageHeader
                className="site-page-header"
                title={consts.name + " v" + consts.version + ""}
            //breadcrumb={{ routes }}
            //subTitle = "This is a subtitle"
            ></PageHeader>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[routes[1]]}
                        defaultOpenKeys={['main', 'db', 'tools', 'other']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="main" icon={<InfoOutlined />} title="Main">
                            <Menu.Item key="home"><Link href="/">Home</Link></Menu.Item>
                            <Menu.Item key="news"><Link href="/news">News</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="db" icon={<UserOutlined />} title="Database">
                            <Menu.Item key="cards"><Link href="/cards">Cards</Link></Menu.Item>
                            <Menu.Item key="members"><Link href="/members">Members</Link></Menu.Item>
                            <Menu.Item key="musics"><Link href="/musics">Musics</Link></Menu.Item>
                            <Menu.Item key="gacha"><Link href="/gacha">Gacha</Link></Menu.Item>
                            <Menu.Item key="events"><Link href="/events">Events</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="tools" icon={<LaptopOutlined />} title="Tools">
                            <Menu.Item key="live2d"><Link href="/live2d">Live2D</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="other" icon={<LaptopOutlined />} title="Other">
                            <Menu.Item key="settings"><Link href="/settings">Settings</Link></Menu.Item>
                            <Menu.Item key="about"><Link href="/about">About</Link></Menu.Item>
                            <Menu.Item key="disclaimers"><Link href="/disclaimers">Disclaimers</Link></Menu.Item>
                            <Menu.Item key="credits"><Link href="/credits">Credits</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{
                    padding: '0 24px 24px',
                    //backgroundColor: "" 
                }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {
                            this.state.path.map(entry => <Breadcrumb.Item>{entry}</Breadcrumb.Item>)
                        }
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: minHeight,
                            maxHeight: window.innerHeight,
                        }}
                    >
                        {this.state.body}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    }
}

export default withRouter(Drawer)