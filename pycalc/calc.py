from sys import argv
# from calculator.simple import SimpleCalculator


def calc(input1, input2):
    """based on the input text, return the operation result"""
    try:
        calculate = float(input1) + float(input2)
        return "%.2f" % calculate
    except Exception as e:
        return e


if __name__ == '__main__':
    print(calc(argv[1], argv[2]))
