test('Lambda Has Environment Variables', () => {
    const stack = new cdk.Stack();
    // WHEN
    new HitCounter(stack, 'MyTestConstruct', {
      downstream:  new lambda.Function(stack, 'TestFunction', {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'hello.handler',
        code: lambda.Code.fromAsset('lambda')
      })
    });
    // THEN
    const template = Template.fromStack(stack);
    const envCapture = new Capture();
    template.hasResourceProperties("AWS::Lambda::Function", {
      Environment: envCapture,
    });
  
    expect(envCapture.asObject()).toEqual(
      {
        Variables: {
          DOWNSTREAM_FUNCTION_NAME: {
            Ref: "VALUE_GOES_HERE",
          },
          HITS_TABLE_NAME: {
            Ref: "VALUE_GOES_HERE",
          },
        },
      }
    );
  });
  