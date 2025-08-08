export class EmployeeIdGenerator {
  private static readonly PREFIX = 'LERA-EMP';
  private static readonly STORAGE_KEY = 'lera_employee_counter';

  static async generateEmployeeId(): Promise<string> {
    const currentYear = new Date().getFullYear();
    
    try {
      // Try to get the last used number from localStorage as fallback
      const lastCounter = parseInt(localStorage.getItem(this.STORAGE_KEY) || '0');
      
      // In a real implementation, this would query the database for the highest employee ID
      // For now, we'll use localStorage to simulate persistence
      const nextNumber = lastCounter + 1;
      
      // Update the counter
      localStorage.setItem(this.STORAGE_KEY, nextNumber.toString());
      
      // Format: LERA-EMP-YYYY-NNNN (4 digits with leading zeros)
      const formattedNumber = nextNumber.toString().padStart(4, '0');
      const employeeId = `${this.PREFIX}-${currentYear}-${formattedNumber}`;
      
      return employeeId;
    } catch (error) {
      console.error('Error generating employee ID:', error);
      throw new Error('Failed to generate employee ID');
    }
  }

  static async getNextEmployeeNumber(): Promise<number> {
    try {
      // This would query the database in a real implementation
      // SELECT MAX(CAST(SUBSTRING(employee_id FROM 'LERA-EMP-[0-9]{4}-([0-9]{4})') AS INTEGER)) FROM employees WHERE employee_id LIKE 'LERA-EMP-2025-%'
      
      const lastCounter = parseInt(localStorage.getItem(this.STORAGE_KEY) || '0');
      return lastCounter + 1;
    } catch (error) {
      console.error('Error getting next employee number:', error);
      return 1;
    }
  }

  static validateEmployeeId(employeeId: string): boolean {
    const pattern = /^LERA-EMP-\d{4}-\d{4}$/;
    return pattern.test(employeeId);
  }

  static parseEmployeeId(employeeId: string): { year: number; number: number } | null {
    if (!this.validateEmployeeId(employeeId)) return null;
    
    const parts = employeeId.split('-');
    const year = parseInt(parts[2]);
    const number = parseInt(parts[3]);
    
    return { year, number };
  }

  static resetCounter(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // For demo purposes - in production this would be handled by database triggers
  static async initializeCounter(): Promise<void> {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, '11'); // Start from 12 for demo
    }
  }
}

// Initialize counter on module load
EmployeeIdGenerator.initializeCounter();