from __future__ import print_function
from calc import calc as real_calc
import sys
import zerorpc


class CalcApi:
    def calc(self, num1, num2):
        """based on the input text, return the int result"""
        try:
            return real_calc(num1, num2)
        except Exception as e:
            print(e)
            return "100"

    def echo(self, text):
        """echo any text"""
        return text


def parse_port():
    return '4242'


def main():
    addr = 'tcp://127.0.0.1:' + parse_port()
    s = zerorpc.Server(CalcApi())
    s.bind(addr)
    print('start running on {}'.format(addr))
    s.run()


if __name__ == '__main__':
    main()
