import React from 'react';
import { Layout, Menu, Avatar, Popover, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useLayout } from '../../contexts';
import LoggedRoute from '../../routes/privates/logged';
import { ROUTES_HOME, ROUTES_LIST } from '../../constants';

export default function LayoutLogged() {
  const { Header, Content, Sider } = Layout;
  const history = useHistory();
  const layoutContext = useLayout();
  const { user, navigationSelected, onLogout } = layoutContext;

  const content = (
    <div className="w-32">
      {/* <Button className="w-full" type="link">
        Editar
        </Button>
      <hr /> */}
      <Button
        onClick={onLogout}
        className="w-full"
        type="link"
        danger
      >
        Sair
      </Button>
    </div>
  );

  function renderMenu() {
    return (
      <Menu theme="dark" mode="inline" selectedKeys={[navigationSelected]}>
        <Menu.Item key={ROUTES_HOME()} onClick={() => history.push(ROUTES_HOME())}>Home</Menu.Item>
        <Menu.Item key={ROUTES_LIST()} onClick={() => history.push(ROUTES_LIST())}>List</Menu.Item>
      </Menu>
    );
  }

  return (
    <>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          zeroWidthTriggerStyle={{ top: 10, height: 47 }}
          onBreakpoint={(broken: any) => {
            // console.log(broken);
          }}
          onCollapse={(collapsed: any, type: any) => {
            // console.log(collapsed, type);
          }}
        >
          <Link to="/" className="logo block px-3 py-2 text-white text-center bg-gray-100 bg-opacity-25">
            <strong>Base Admin</strong><br />
            Dashboard
          </Link>
          {renderMenu()}
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          >
            <div className="w-full h-full flex items-center px-5">
              <div className="flex-1" />
              <Popover
                className="cursor-pointer"
                placement="bottomRight"
                content={content}
                trigger="click"
              >
                <div className="text-gray-100 flex items-center">
                  <span className="mr-3">{user.name}</span>
                  <Avatar
                    className="bg-gray-100"
                    size={40}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  >
                    JS
                  </Avatar>
                </div>
              </Popover>
            </div>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              className="site-layout-background flex-1 max-w-full sm:p5"
            >
              <LoggedRoute />
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>
            <span>Copyright &copy; todos os direitos reservados - @2020 </span>
          </Footer> */}
        </Layout>
      </Layout>
    </>
  );
}
