import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import * as d3Shape from "d3-shape";
import color from "randomcolor";
import { snap } from "@popmotion/popcorn";
import Svg, { Path, G, Text as SVText, TSpan } from "react-native-svg";
import { colors } from '../../../constants/Themes';

const { width, height } = Dimensions.get("screen");

const numberOfSegments = 6;
const wheelSize = width * 0.95;
const oneTurn = 360;
const angleBySegment = oneTurn / numberOfSegments;
const angleOffset = angleBySegment / 2;
const knobFill = color({ hue: colors.secondary2 });

const makeWheel = () => {
  const data = Array.from({ length: numberOfSegments }).fill(1);
  const arcs = d3Shape.pie()(data);
  const colors = color({
    luminosity: "dark",
    count: numberOfSegments,
  });

  return arcs.map((arc, index) => {
    const instance = d3Shape
      .arc()
      .padAngle(0.01)
      .outerRadius(width / 2)
      .innerRadius(20);

    const val = [2, 2, 0, 0, 0, 3];

    return {
      path: instance(arc),
      color: colors[index],
      value: Math.round(val[index]), //[200, 2200]
      centroid: instance.centroid(arc),
    };
  });
};

export default class SpinScreenCls extends React.Component {
  _wheelPaths = makeWheel();
  _angle = new Animated.Value(0);
  angle = 0;

  state = {
    button: true,
    enabled: true,
    finished: false,
    winner: null,
  };

  componentDidMount() {
    this._angle.addListener((event) => {
      this.setState({
        button: false,
      });
      if (this.state.enabled) {
        this.setState({
          enabled: false,
          finished: false,
        });
      }

      this.angle = event.value;
    });
  }

  _getWinnerIndex = () => {
    const deg = Math.abs(Math.round(this.angle % oneTurn));
    return Math.floor(deg / angleBySegment);
  };

  _onPan = () => {
    Animated.decay(this._angle, {
      velocity: 6000 / 1000,
      deceleration: 0.999,
      useNativeDriver: true,
    }).start(() => {
      this._angle.setValue(this.angle % oneTurn);
      const snapTo = snap(oneTurn / numberOfSegments);
      Animated.timing(this._angle, {
        toValue: snapTo(this.angle),
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        const winnerIndex = this._getWinnerIndex();
        this.setState({
          button: true,
          enabled: true,
          finished: true,
          winner: this._wheelPaths[winnerIndex].value,
        });
      });
    });
  };
  render() {
    return (
      //     <GestureHandlerRootView>

      //   <PanGestureHandler
      //     onHandlerStateChange={this._onPan}
      //     // onGestureEvent={this._onPan}
      //     enabled={this.state.enabled}
      //   >
      <Animated.View style={styles.container}>
        {this._renderSvgWheel()}
        {this.state.finished && this.state.enabled && this._renderWinner()}
        {this.state.button ? (
          <TouchableOpacity style={{ bottom: 80 }} onPress={this._onPan}>
            <View style={styles.pressButton}>
              <Text style={{ fontSize: 40, color: colors.white }}>
                TAP TO SPIN
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </Animated.View>
      //    </PanGestureHandler>
      //    </GestureHandlerRootView>
    );
  }

  _renderKnob = () => {
    const knobSize = 30;
    // [0, numberOfSegments]
    const YOLO = Animated.modulo(
      Animated.divide(
        Animated.modulo(Animated.subtract(this._angle, angleOffset), oneTurn),
        new Animated.Value(angleBySegment)
      ),
      1
    );

    return (
      <Animated.View
        style={{
          width: knobSize,
          height: knobSize * 2,
          justifyContent: "flex-end",
          zIndex: 1,
          transform: [
            {
              rotate: YOLO.interpolate({
                inputRange: [-1, -0.5, -0.0001, 0.0001, 0.5, 1],
                outputRange: [
                  "0deg",
                  "0deg",
                  "35deg",
                  "-35deg",
                  "0deg",
                  "0deg",
                ],
              }),
            },
          ],
        }}
      >
        <Svg
          width={knobSize}
          height={(knobSize * 100) / 57}
          viewBox={`0 0 57 100`}
          style={{ transform: [{ translateY: 8 }] }}
        >
          <Path
            d="M28.034,0C12.552,0,0,12.552,0,28.034S28.034,100,28.034,100s28.034-56.483,28.034-71.966S43.517,0,28.034,0z   M28.034,40.477c-6.871,0-12.442-5.572-12.442-12.442c0-6.872,5.571-12.442,12.442-12.442c6.872,0,12.442,5.57,12.442,12.442  C40.477,34.905,34.906,40.477,28.034,40.477z"
            fill={knobFill}
          />
        </Svg>
      </Animated.View>
    );
  };

  _renderWinner = () => {
    return (
      <Text style={styles.winnerText}>
        {this.state.winner > 0
          ? `${this.state.winner} x Points Received`
          : "Try Again"}
      </Text>
    );
  };

  _renderSvgWheel = () => {
    return (
      <View style={styles.container}>
        {this._renderKnob()}
        <Animated.View
          style={{
            alignItems: "center",
            justifyContent: "center",
            transform: [
              {
                rotate: this._angle.interpolate({
                  inputRange: [-oneTurn, 0, oneTurn],
                  outputRange: [`-${oneTurn}deg`, `0deg`, `${oneTurn}deg`],
                }),
              },
            ],
          }}
        >
          <Svg
            width={wheelSize}
            height={wheelSize}
            stroke={"white"}
            strokeWidth={1.8}
            viewBox={`0 0 ${width} ${width}`}
            style={{ transform: [{ rotate: `-${angleOffset}deg` }] }}
          >
            <G y={width / 2} x={width / 2}>
              {this._wheelPaths.map((arc, i) => {
                const [x, y] = arc.centroid;
                const number = arc.value.toString();

                return (
                  <G key={`arc-${i}`}>
                    <Path d={arc.path} fill={arc.color} />
                    <G
                      rotation={(i * oneTurn) / numberOfSegments + angleOffset}
                      origin={`${x}, ${y}`}
                    >
                      {/* <Text style={{color:'white',zIndex:100}}>cc</Text> */}
                      <SVText
                        x={x}
                        y={y - 70}
                        fill="white"
                        textAnchor="middle"
                        fontSize={25}
                      >
                        {Array.from({ length: number.length }).map((_, j) => {
                          return (
                            <TSpan x={x} dy={20} key={`arc-${i}-slice-${j}`}>
                              {number.charAt(j) == 0
                                ? "Try Again"
                                : `${number.charAt(j)} x`}
                            </TSpan>
                          );
                        })}
                      </SVText>
                    </G>
                  </G>
                );
              })}
            </G>
          </Svg>
        </Animated.View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  winnerText: {
    fontSize: 32,
    position: "absolute",
    top: 80,
    color: colors.white,
    textShadowOffset: { width: -1, height: 3 },
    textShadowColor: colors.secondary2,
    shadowOpacity: 0.2,
    textShadowRadius: 5,
  },
  pressButton: {
    height: 70,
    width: width / 2,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
