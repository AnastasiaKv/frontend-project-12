import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Col, Nav, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as AddButton } from '../assets/add_btn.svg';
import { actions as channelActions } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalSlice';

const Channel = ({
  channel, isActive, handleRename, handleRemove, handleChoose,
}) => {
  const { t } = useTranslation();
  const buttonVariant = isActive ? 'secondary' : 'light';
  const button = (
    <Button
      className="w-100 rounded-0 text-start"
      variant={buttonVariant}
      key={channel.id}
      onClick={handleChoose}
    >
      <span className="visually-hidden">{t('chatPage.control')}</span>
      {channel.name}
    </Button>
  );

  if (channel.removable) {
    return (
      <Dropdown as={ButtonGroup} key={channel.id}>
        {button}
        <Dropdown.Toggle split variant={buttonVariant} id="dropdown-split-basic" />
        <Dropdown.Menu>
          <Dropdown.Item href="" onClick={handleRemove}>{t('chatPage.remove')}</Dropdown.Item>
          <Dropdown.Item href="" onClick={handleRename}>{t('chatPage.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  return button;
};

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels, currentChannel } = useSelector((state) => state.channelsInfo);

  const channelHandler = (type, channelId) => {
    const extra = channelId ? { channelId } : null;
    dispatch(modalActions.open({ type, extra }));
  };

  const updateCurrentChannelHandler = (id) => (
    dispatch(channelActions.updateCurrentChannel({ id }))
  );

  return (
    <Col className="border-end pt-5 px-0 bg-light" xs="4" md="2">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('chatPage.channels')}</span>
        <Button className="btn-group-vertical p-0 text-primary" variant="light" onClick={() => channelHandler('addChannel')}>
          <AddButton />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav className="px-2 flex-column justify-content-left" as="ul" variant="pills" fill justify="left">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isActive={channel.id === currentChannel.id}
            handleRename={() => channelHandler('renameChannel', channel.id)}
            handleRemove={() => channelHandler('removeChannel', channel.id)}
            handleChoose={() => updateCurrentChannelHandler(channel.id)}
          />
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;
