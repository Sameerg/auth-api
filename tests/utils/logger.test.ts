import logger from '../../src/utils/logger';

describe('Logger', () => {
  it('should have a console transport', () => {
    const consoleTransport = logger.transports.find(transport => transport.constructor.name === 'Console');
    expect(consoleTransport).toBeDefined();
  });

//   it('should have a file transport for errors', () => {
//     const errorFileTransport = logger.transports.find(transport => transport.filename === 'error.log');
//     expect(errorFileTransport).toBeDefined();
//   });

//   it('should have a file transport for combined logs', () => {
//     const combinedFileTransport = logger.transports.find(transport => transport.filename === 'combined.log');
//     expect(combinedFileTransport).toBeDefined();
//   });
});
