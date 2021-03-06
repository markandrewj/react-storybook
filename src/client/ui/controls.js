import React from 'react';

export default class StorybookControls extends React.Component {
  getKindNames() {
    const { storyStore } = this.props;
    if (!storyStore) {
      return [];
    }

    return storyStore.map(({ kind }) => kind);
  }

  getStories(kind) {
    const { storyStore } = this.props;
    const storiesInfo = storyStore.find(item => item.kind === kind);

    if (!storiesInfo) {
      return [];
    }
    return storiesInfo.stories;
  }

  fireOnKind(kind) {
    const { onKind } = this.props;
    if (onKind) onKind(kind);
  }

  fireOnStory(story) {
    const { onStory } = this.props;
    if (onStory) onStory(story);
  }

  renderStory(story) {
    const { selectedStory } = this.props;
    const storyStyle = {
      fontSize: 13,
      padding: '8px 0px 8px 10px',
      cursor: 'pointer',
    };

    if (story === selectedStory) {
      storyStyle.fontWeight = 'bold';
    }
    return (
      <div
        key={story}
        style={storyStyle}
        onClick={this.fireOnStory.bind(this, story)}
      >
        {story}
      </div>
    );
  }

  renderKind(kind) {
    const kindStyle = {
      fontSize: 15,
      padding: '10px 0px',
      cursor: 'pointer',
      borderBottom: '1px solid #EEE',
    };

    const { selectedKind } = this.props;
    if (kind === selectedKind) {
      const stories = this.getStories(selectedKind);
      kindStyle.fontWeight = 'bold';
      return (
        <div key={kind}>
          <div
            style={kindStyle}
            onClick={this.fireOnKind.bind(this, kind)}
          >
            {kind}
          </div>
          <div>
            {stories.map(this.renderStory.bind(this))}
          </div>
        </div>
      );
    }

    return (
      <div
        key={kind}
        style={kindStyle}
        onClick={this.fireOnKind.bind(this, kind)}
      >
        {kind}
      </div>
    );
  }

  render() {
    const kindNames = this.getKindNames();
    const mainStyle = {
      fontFamily: `
        -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto",
        "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif
      `,
      color: '#444',
    };

    const h1WrapStyle = {
      background: '#F7F7F7',
      borderBottom: '1px solid #EEE',
      paddingBottom: '20px',
      position: 'absolute',
      top: '20px',
      right: '10px',
      left: '20px',
    };

    const h1Style = {
      textTransform: 'uppercase',
      letterSpacing: '3.5px',
      fontSize: '12px',
      fontWeight: 'bolder',
      color: '#828282',
      border: '1px solid #C1C1C1',
      textAlign: 'center',
      borderRadius: '2px',
      padding: '5px',
      cursor: 'default',
      margin: 0,
    };

    const listStyle = {
      overflowY: 'auto',
      position: 'absolute',
      top: '68px',
      right: '10px',
      bottom: 0,
      left: '20px',
    };

    return (
      <div style={mainStyle}>
        <div style={h1WrapStyle}>
          <h3 style={h1Style}>React Storybook</h3>
        </div>
        <div style={listStyle}>
          {kindNames.map(this.renderKind.bind(this))}
        </div>
      </div>
    );
  }
}

StorybookControls.propTypes = {
  storyStore: React.PropTypes.array,
  selectedKind: React.PropTypes.string,
  selectedStory: React.PropTypes.string,
  onKind: React.PropTypes.func,
  onStory: React.PropTypes.func,
};
