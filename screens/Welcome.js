import React, { Component } from "react";
import {
  FlatList,
  Image,
  Modal,
  Dimensions,
  Animated,
  ScrollView,
  StyleSheet
} from "react-native";
import { Block, Button, Text } from "../components";
import { theme } from "../constants";

const { width, height } = Dimensions.get("window");
scrollX = new Animated.Value(0);

class Welcome extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    showTerms: false
  };

  renderIllustrations() {
    const { illustrations } = this.props;
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraData={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 2, overflow: "visible" }}
          />
        )}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { x: this.scrollX } }
          }
        ])}
      />
    );
  }
  renderSteps() {
    const { illustrations } = this.props;
    const stepPosition = Animated.divide(this.scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp"
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps]}
            />
          );
        })}
      </Block>
    );
  }

  renderTermsService() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showTerms}
        onRequestClose={() => this.setState({ showTerms: false })}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light>
            Terms of Service
          </Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam eum ad dicta explicabo commodi qui nostrum voluptatibus
              asperiores est facere consequuntur placeat reprehenderit ipsam
              blanditiis reiciendis, esse tempore ducimus optio.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              suscipit voluptate rem soluta voluptas ratione tempora dicta
              necessitatibus aliquam ut. Quo quaerat molestiae dolore dicta
              mollitia officiis soluta ullam praesentium.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              3. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloribus rem dolorum, cumque impedit placeat at officia odit
              ipsum ab molestias! Quibusdam libero alias architecto esse porro
              non placeat commodi voluptatum!
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              4. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Ratione voluptatum hic, incidunt beatae et dolor autem cupiditate
              suscipit consectetur quasi saepe modi laudantium ea voluptas
              labore quis facilis magni earum.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              5. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate quasi exercitationem nostrum ipsum, tempore deserunt
              doloremque magnam! Laboriosam maiores cumque adipisci optio odit
              magnam pariatur consectetur eos molestiae, error veniam!
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              6. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptas deleniti laudantium odio, molestiae vitae dolores ut
              consectetur, saepe pariatur ratione cumque, amet magni quia.
              Voluptate minus saepe tenetur blanditiis non.
            </Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button
              gradient
              onPress={() => this.setState({ showTerms: false })}
            >
              <Text center white>
                I understand
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }
  render() {
    const { navigation } = this.props;

    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold>
            Your home.
            <Text h1 primary>
              Greener.
            </Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            Enjoy the experience.
          </Text>
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
          {this.renderSteps()}
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate("Login")}>
            <Text center semibold white>
              Login
            </Text>
          </Button>
          <Button shadow onPress={() => navigation.navigate("SignUp")}>
            <Text center semibold>
              Signup
            </Text>
          </Button>
          <Button onPress={() => this.setState({ showTerms: true })}>
            <Text center caption gray>
              Terms of service
            </Text>
          </Button>
        </Block>
        {this.renderTermsService()}
      </Block>
    );
  }
}

Welcome.defaultProps = {
  illustrations: [
    { id: 1, source: require("../assets/images/illustration_1.png") },
    { id: 2, source: require("../assets/images/illustration_2.png") },
    { id: 3, source: require("../assets/images/illustration_3.png") }
  ]
};

export default Welcome;

const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  }
});
